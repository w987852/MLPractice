const rp = require('request-promise');
const moment = require('moment');
const cheerio = require('cheerio');
const config = require('config/config');
const CPBL = config.CPBL

class CPBLService {
    static async getCPBLData() {
        await getPlayerListData();
    }
}

async function getPlayerListData() {
    for (let key in CPBL.team) {
        let teamId = CPBL.team[key];
        let uri = CPBL.teamUrl;
        uri += `&team=${teamId}`;
        let options = {
            uri,
            method: 'GET',
        }
        let result = await rp(options);
        //console.log('result:', result)
        const $ = cheerio.load(result);
        let playerInfoList = [];
        let playerLinkList = [];
        await $('.gap_b20 tr td').each(function(i, elem) {
            if ($(this).html().indexOf('player_id') > 0) {
                let uri = $(this).html();
                uri = uri.slice(uri.indexOf('player_id'));
                let playerId = uri.slice(uri.indexOf('player_id') + 10, uri.indexOf('&amp'));
                playerLinkList.push(playerId);
            }
            playerInfoList.push(_.trim($(this).text()))
        });
        for (let i = 0; i < playerInfoList.length; i += 6) {
            let batAndPitch = _.split(playerInfoList[i + 3], '/');
            let bat = '';
            let pitch = '';
            if (batAndPitch[0].length > 2) {
                bat = 'both';
            } else if (batAndPitch[0][0] === '右') {
                bat = 'right';
            } else if (batAndPitch[0][0] === '左') {
                bat = 'left';
            }
            if (batAndPitch[1].length > 2) {
                pitch = 'both';
            } else if (batAndPitch[0][0] === '右') {
                pitch = 'right';
            } else if (batAndPitch[0][0] === '左') {
                pitch = 'left';
            }
            let _player = {
                name: playerInfoList[i + 1],
                team: key,
                playerIdOnCPBL: playerLinkList[i / 6],
                no: playerInfoList[i],
                position: playerInfoList[i + 2],
                birthday: playerInfoList[i + 5],
                height: _.split(playerInfoList[i + 4], '/')[0],
                weight: _.split(playerInfoList[i + 4], '/')[1],
                bat,
                pitch
            }
            console.log(_player);
            let team = db.Team.findOne({name: key}).lean();
            if (!team) {
                await db.Team.create({
                    name: key,
                    teamIdOnCPBL: teamId
                })
            }
            await db.Player.update({playerIdOnCPBL: _player.playerIdOnCPBL}, {$set: _player}, {upsert: true});
        } 
        //console.log(playerInfoList)
    }
}

module.exports = CPBLService;