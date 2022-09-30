// http://localhost:8888/api/property
require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table('realestate')

  exports.handler = async(event, context) => {
    try {
        const {records} = await airtable.list()
        const properties = records.map((property) => {
            const {id} = property 
            const {images, sqft, bed, bath, price, city, state, description, firstname, lastname, phone, featured, newlisting} = property.fields
            const url = images[0].url 
            return {sqft, bed, bath, price, url, id, city, state, description, firstname, lastname, phone, featured, newlisting}
        })
        return {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            },
            statusCode: 200,
            body: JSON.stringify(properties)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: 'There was a server error'
        }
    }
}