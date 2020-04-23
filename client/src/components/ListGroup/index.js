import React from "react";
// import "./sass/style.scss";

// function ListGroup(props) {
//     return (
//         <ul class="list-group">
//             <li class="list-group-item font-weight-bold">By Category</li>
//             <li class="list-group-item">Appliance</li>
//             <li class="list-group-item">Home</li>
//             <li class="list-group-item">Lawn</li>
//             <li class="list-group-item">Hair</li>
//             <li class="list-group-item">Cosmetics</li>
//             <li class="list-group-item">Technology</li>
//             <li class="list-group-item">Social</li>
//             <li class="list-group-item">Games</li>
//         </ul>
//     );
// }

// export default ListGroup;


function ListGroup(props) {
    return (
        <ul class="list-group">
            <li class="list-group-item font-weight-bold">By Category</li>
            <li className="list-group-item category-item" key={props.id}>{props.item}</li>
        </ul>
    );
}

export default ListGroup;