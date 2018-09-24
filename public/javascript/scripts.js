//scripts
function deleteComment(iD) {
    let commentId = document.getElementById('btn-Id-' + iD).getAttribute('data-comment-id');
    axios.delete(`/reviews/comments/${commentId}`).then(response => {
                console.log(response)
                document.getElementById(commentId).remove()
            })
            .catch(error => {
                console.log(error)
                alert('There was an error deleting this comment.')
            });
}

function commentAdd() {
    let elements = document.getElementById('newComment').elements;
    let data = {};
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type != 'submit'){
            data[elements[i].name] = elements[i].value;
        }
    if (data['title'] == "" || data['content'] == ""){
        return;
    }
    }
    console.log(JSON.stringify(data));
    axios.post('/reviews/comments', data)
        .then(function(response) {
            document.getElementById('newComment').reset();
            // $('#comments').prepend(
            document.getElementById("comments").innerHTML =
                `
                   <div class="card" id="${response.data.comment._id}">
                   <div class="card-block">
                   <h4 class="card-title">${response.data.comment.title}</h4>
                   <p class="card-text">${response.data.comment.content}</p>
                   <p><button id="btn-Id-${response.data.comment._id}" class="btn btn-link deleteComment" data-comment-id=${response.data.comment._id} onclick="deleteComment('${response.data.comment._id}')">Delete</button></p>
                   </div>
                   </div>
                   `
                   + document.getElementById("comments").innerHTML;
            // );
            // wait for the success response from the server
            console.log(response);
            // remove the information from the form
            // display the data as a new comment on the page
        })
        .catch(function(error) {
            console.log(error);
            // handle any errors
            alert('There was a problem saving your comment. Please try again.')
        });
    }





//
// document.getElementById("newComment").addEventListener("submit", e => {
//
//     // prevent the default form behavior
//     e.preventDefault();
//     // serialize the form data into an object
//     let comment = new FormData(document.getElementById("newComment"));
//     // use axios to initialize a post request and send in the form data
//
//     let data = {}
//     for (let i of comment) {
//         data[i[0]] = i[1]
//     }
//     console.log(JSON.stringify(data));
//     axios.post('/reviews/comments', data)
//         .then(function(response) {
//             document.getElementById('newComment').reset();
//             $('#comments').prepend(
//                 `
//                    <div class="card" id="${response.data.comment._id}">
//                    <div class="card-block">
//                    <h4 class="card-title">${response.data.comment.title}</h4>
//                    <p class="card-text">${response.data.comment.content}</p>
//                    <p><button class="btn btn-link deleteComment" data-comment-id=${response.data.comment._id}>Delete</button></p>
//                    </div>
//                    </div>
//                    `
//             );
//             // wait for the success response from the server
//             console.log(response);
//             // remove the information from the form
//             // display the data as a new comment on the page
//         })
//         .catch(function(error) {
//             console.log(error);
//             // handle any errors
//             alert('There was a problem saving your comment. Please try again.')
//         });
// });
