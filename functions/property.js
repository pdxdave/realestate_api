// http://localhost:8888/api/property
require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PERSONA_ACCESS_TOKEN })
  .base(process.env.AIRTABLE_BASE)
  .table('realestate')

  exports.handler = async(event, context) => {
    try {
        const {records} = await airtable.list()
        const properties = records.map((property) => {
            const {id} = property 
            const {dwelling, address, images, sqft, bed, bath, price, city, state, description, firstname, lastname, phone, featured, newlisting, tagline} = property.fields
            const url = images[0].url 
            return {dwelling, address, images, sqft, bed, bath, price, url, id, city, state, description, firstname, lastname, phone, featured, newlisting, tagline}
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