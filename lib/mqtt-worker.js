import mqtt from 'mqtt';

// Kita gunakan satu instance client saja agar tidak boros koneksi
let client = null;

export const connectMQTT = (onMessage, onStatusChange) => {
    if (client) return client; // Jika sudah ada, jangan buat baru

    // Gunakan websocket (ws) untuk koneksi dari Browser
    client = mqtt.connect(`ws://broker.emqx.io:8083/mqtt`);

    client.on('connect', () => {
        console.log("MQTT Worker: Connected");
        if (onStatusChange) onStatusChange(true);
        // Subscribe ke topik global atau topik spesifik
        client.subscribe('/unnes/iot-e/#'); 
    });

    client.on('error', (err) => {
        console.error("MQTT Worker: Error", err);
        if (onStatusChange) onStatusChange(false);
    });

    client.on('close', () => {
        if (onStatusChange) onStatusChange(false);
    });

    client.on('message', (topic, message) => {
        if (onMessage) onMessage(topic, message.toString());
    });

    return client;
};

export const disconnectMQTT = () => {
    if (client) {
        client.end();
        client = null;
    }
};