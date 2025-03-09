const { Session } = require('snmp-native');

// OIDs for detecting color support and getting toner levels
const blackTonerOid = '1.3.6.1.2.1.43.11.1.1.9.1.5';
const cyanTonerOid = '1.3.6.1.2.1.43.11.1.1.9.1.2';
const magentaTonerOid = '1.3.6.1.2.1.43.11.1.1.9.1.1';
const yellowTonerOid = '1.3.6.1.2.1.43.11.1.1.9.1.4';

// An OID to check if the printer is a color printer (example OID, replace if needed)
const colorSupportOid = '1.3.6.1.2.1.43.10.2.1.4.1.1'; // Check if the printer supports color

async function getPrinterStatus(ip) {
    return new Promise((resolve) => {
        const session = new Session({ host: ip, community: 'public', version: snmp.Version1 });

        session.get({ oid: [colorSupportOid] }, (error, varbinds) => {
            const isColorPrinter = !error && parseInt(varbinds[0].value, 10) > 1;

            const oids = isColorPrinter 
                ? [blackTonerOid, cyanTonerOid, magentaTonerOid, yellowTonerOid] 
                : [blackTonerOid];

            session.getAll({ oids: oids.map(oid => [oid]) }, (err, vb) => {
                if (err) {
                    resolve({ isOnline: false, tonerLevels: null });
                } else {
                    const tonerLevels = {
                        black: parseInt(vb[0]?.value, 10) || null,
                        cyan: isColorPrinter ? parseInt(vb[1]?.value, 10) || null : null,
                        magenta: isColorPrinter ? parseInt(vb[2]?.value, 10) || null : null,
                        yellow: isColorPrinter ? parseInt(vb[3]?.value, 10) || null : null,
                    };
                    resolve({ isOnline: true, isColorPrinter, tonerLevels });
                }
                session.close();
            });
        });
    });
}

module.exports = { getPrinterStatus };
