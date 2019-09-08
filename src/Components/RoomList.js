import React from 'react';

class RoomList extends React.Component {
    render() {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id)
        return (
            <div className="room-list">
                <ul>
                <h3>Your Rooms:</h3>
                {orderedRooms.map(room => {
                    const active = this.props.roomId === room.id ? "active" : "";
                    return (//can use anchor tag instead of link tag
                        <li key={room.id} className={"room" + active}>
                            <link onClick={() => {this.props.subscribeToRoom(room.id) }}
                            href="#">
                                # {room.name}
                            </link>
                        </li>
                    )
                })}
                </ul>
            </div>
        );
    }
}
//1:11:42 

export default RoomList;
