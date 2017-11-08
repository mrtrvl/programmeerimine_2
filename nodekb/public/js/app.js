$(document).ready(()=> {
    $('.delete-post').on('click', (event)=> {
        $target = $(event.target);
        const id = $target.attr('post-id');
        $.ajax({
            type: 'DELETE',
            url: '/post/' + id,
            success: (response) => {
                alert('Postitus kustutatud');
                window.location.href='/posts';
            },
            error: (error) => {
                console.log(error);
            }
        });
    });
});