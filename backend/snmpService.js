const { Session } = require('snmp-native');

// OIDs for toner levels (as arrays of integers)
const blackTonerOid = [1, 3, 6, 1, 2, 1, 43, 11, 1, 1, 9, 1, 1];
const cyanTonerOid = [1, 3, 6, 1, 2, 1, 43, 11, 1, 1, 9, 1, 2];
const magentaTonerOid = [1, 3, 6, 1, 2, 1, 43, 11, 1, 1, 9, 1, 3];
const yellowTonerOid = [1, 3, 6, 1, 2, 1, 43, 11, 1, 1, 9, 1, 4];

// OID to check if the printer is a color printer
const colorSupportOid = [1, 3, 6, 1, 2, 1, 43, 10, 2, 1, 4, 1, 1];

async function getPrinterStatus(ip) {
    return new Promise((resolve) => {
        const session = new Session({ host: ip, community: 'public' });

        // Check if the printer supports color
        session.get({ oid: colorSupportOid }, (error, varbinds) => {
            const isColorPrinter = !error && parseInt(varbinds[0]?.value, 10) > 1;

            const oids = isColorPrinter 
                ? [blackTonerOid, cyanTonerOid, magentaTonerOid, yellowTonerOid]
                : [blackTonerOid];

            // Fetch toner levels
            session.getAll({ oids }, (err, vb) => {
                if (err) {
                    console.error(`SNMP Error: ${err.message}`);
                    resolve({ isOnline: false, tonerLevels: null });
                } else {
                    console.log('SNMP Response:', vb.map(v => ({
                        oid: v.oid.join('.'),
                        value: v.value,
                        type: v.type
                    })));

                    const tonerLevels = {
                        black: parseInt(vb[0]?.value, 10) || null,
                        cyan: isColorPrinter ? parseInt(vb[1]?.value, 10) || null : null,
                        magenta: isColorPrinter ? parseInt(vb[2]?.value, 10) || null : null,
                        yellow: isColorPrinter ? parseInt(vb[3]?.value, 10) || null : null,
                    };

                    console.log('Parsed Toner Levels:', tonerLevels);

                    resolve({ isOnline: true, isColorPrinter, tonerLevels });
                }
                session.close();
            });
        });
    });
}

module.exports = { getPrinterStatus };
