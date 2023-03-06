import { NextApiRequest, NextApiResponse } from 'next'
import { google, sheets_v4 } from 'googleapis';

type batchGetByDataFilterParam = sheets_v4.Params$Resource$Spreadsheets$Values$Batchgetbydatafilter

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;

    console.log(body);

    const sheetID = process.env.GOOGLE_SHEET_ID;
    const sheetName = 'RAW_LIVE!'
    const jwt = new google.auth.JWT(
        process.env.GOOGLE_EMAIL,
        null,
        (process.env.GOOGLE_PK || '').replace(/\\n/g, '\n'),
        ["https://www.googleapis.com/auth/spreadsheets"]
    );
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const columnLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    
    const getHeaders = async () => {
        const headerSet = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetID,
            range: sheetName + 'A1:Z1', // sheet name
        })

        return headerSet.data.values[0]
    }

    const getEmail = async (emailCol: string, email: string) => {
        const emails = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetID,
            range: sheetName + emailCol+'1:'+emailCol+'9999', // sheet name
        })
        
        return [emails.data.values[0].includes(email), emails.data.values.length];
    }

    const registerEmail = async (values: string[][], range: string) => {
        const update = await sheets.spreadsheets.values.append({
            spreadsheetId: sheetID,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: values
            },
            range: range,
        }, )

        return update;
    }

    // step 1 check if can connect to sheet
    try {
        const signupTime = new Date();
        const headers = (await getHeaders());
        const emailCol = columnLetters[headers.indexOf('Email')]

        const bodyParams = [body.name, body.email, body.org, signupTime.toUTCString(), body.interests]
        console.log(bodyParams);

        const [alreadySignedUp, lastRow] = (await getEmail(emailCol, body.email));

        if (alreadySignedUp) {
            res.status(200).json({e: 'already_registered'})
        } else {

            try {
                const tryRegister = await registerEmail([bodyParams], sheetName + 'A1:' + columnLetters[headers.length - 1] + lastRow.toString());
                res.status(200).json({e: 'success'})
            } catch (e) {
                console.log(e);
                res.status(200).json({e: 'error'})
            }
        }

        
    } catch (e) {
        console.log(e);
        res.status(200).json({e: 'error'})
    }

    
    //res.status(500).json({e: 'error'})
}