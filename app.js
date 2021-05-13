const discord = require("discord.js")
const {token , channel_id} = require("./config.json")

// Export  modules
const command = require("./command.js")
const oref = require("./oref.js")

const client = new discord.Client()
client.on("ready" , () => {
    const channel = client.channels.cache.get(channel_id)
    console.log("Connected")
    channel.send(`I'm on gurd cowboys :)`)
    setInterval(() => oref.watchAlerts(text => {
        channel.send(`${text}`)
    }), 5000);
    command(client , "alerts" , message => {
        oref.fetchData(text => {
            message.channel.send(`${text}`)
        })      
    })
})
client.login(token)



