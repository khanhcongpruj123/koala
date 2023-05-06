import * as mqtt from 'mqtt';

console.log('Connect to MQTT');
const client = mqtt.connect(process.env.HIVE_MQTT_URL, {
  username: 'idevboa',
  password: 'Kmrdeveloper@315',
});

export { client };
