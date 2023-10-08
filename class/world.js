const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');

//const worldData = require('../data/world-data');

class World {
    constructor() {
        this.rooms = {};
        this.items = {};
    }

    loadWorld(worldData) {
        const roomList = worldData.rooms;
        const itemList = worldData.items;

        // Instantiate new room objects and store them in this.rooms
        for (let i = 0; i < roomList.length; i++) {
            let roomData = roomList[i];
            let newRoom = new Room(roomData.name, roomData.description);
            this.rooms[roomData.id] = newRoom;
        }


        // Connect rooms by ID
        // Note that all rooms must be created before they can be connected
        for (let i = 0; i < roomList.length; i++) {
            let roomID = roomList[i].id;
            let roomConnections = roomList[i].exits;
            for (const direction in roomConnections) {
                let connectedRoomID = roomConnections[direction];
                let roomToConnect = this.rooms[connectedRoomID];
                this.rooms[roomID].connectRooms(direction, roomToConnect);
            }
        }
        for (let i = 0; i < itemList.length; i++) {
            let itemData = itemList[i];
            let newItem;

            if (itemData.isFood) {
                newItem = new Food(itemData.name, itemData.description, itemData.room);
            } else {
                newItem = new Item(itemData.name, itemData.description, itemData.room);
            }

            // Check if the room exists before adding the item to it
            if (this.rooms[itemData.room]) {
                this.rooms[itemData.room].addItem(newItem);
                this.items[itemData.name] = newItem; // Store the item in the World's items dictionary
            }
        }
    }
}


module.exports = {
  World,
};
