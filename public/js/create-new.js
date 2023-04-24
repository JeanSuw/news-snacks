async function createNewForm(event){
    event.preventDefault();
    const userTitle = document.querySelector('input[type="post-title"]').value;
    const userPost = document.querySelector('textarea[id="exampleFormControlTextarea1"]').value;
    
    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({userTitle, userPost}),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok){
        document.location.replace('/dashboard');
    }else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post').addEventListener('button',createNewForm)