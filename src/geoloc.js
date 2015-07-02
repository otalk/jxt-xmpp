import { Namespace as NS } from 'xmpp-constants';


export default function (JXT) {

    let Utils = JXT.utils;

    let GeoLoc = JXT.define({
        name: 'geoloc',
        namespace: NS.GEOLOC,
        element: 'geoloc',
        fields: {
            accuracy: Utils.numberSub(NS, 'accuracy', true),
            altitude: Utils.numberSub(NS, 'alt', true),
            area: Utils.textSub(NS, 'area'),
            heading: Utils.numberSub(NS, 'bearing', true),
            bearing: Utils.numberSub(NS, 'bearing', true),
            building: Utils.textSub(NS, 'building'),
            country: Utils.textSub(NS, 'country'),
            countrycode: Utils.textSub(NS, 'countrycode'),
            datum: Utils.textSub(NS, 'datum'),
            description: Utils.textSub(NS, 'description'),
            error: Utils.numberSub(NS, 'error', true),
            floor: Utils.textSub(NS, 'floor'),
            latitude: Utils.numberSub(NS, 'lat', true),
            locality: Utils.textSub(NS, 'locality'),
            longitude: Utils.numberSub(NS, 'lon', true),
            postalcode: Utils.textSub(NS, 'postalcode'),
            region: Utils.textSub(NS, 'region'),
            room: Utils.textSub(NS, 'room'),
            speed: Utils.numberSub(NS, 'speed', true),
            street: Utils.textSub(NS, 'street'),
            text: Utils.textSub(NS, 'text'),
            timestamp: Utils.dateSub(NS, 'timestamp'),
            tzo: Utils.tzoSub(NS, 'tzo'),
            uri: Utils.textSub(NS, 'uri')
        }
    });

    JXT.extendPubsubItem(GeoLoc);
}
