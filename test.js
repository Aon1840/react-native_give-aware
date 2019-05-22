import * as firebase from 'firebase';

firebase.database().ref("/posts").on("value", snapshot => {
    var posts = [];
    snapshot.forEach(child => {
        posts.push({
            key: child.key,
            name: child.val().name,
            area: child.val().area,
            province: child.val().province,
            description: child.val().description,
            price: child.val().price,
            imageUrl: child.val().imageUrl
        });
    })

    console.log("post: ",posts)
})