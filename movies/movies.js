let currentId = 0;
//array of movies
const movieList = [];

$(function(){
    //on form submit create new row and add to html and array of movies

    $('#input-form').on('submit', function(evt){
        evt.preventDefault();
        let movie = $('#movie').val();
        if(movie.length < 2) return alert("Enter a valid title, please");
        let rating = $('#rating').val();
        if(!rating || rating < 0 || rating >10) return alert("Enter a valid rating( 0 - 10 ), please")
        
        let movieRow = {movie, rating, currentId};
        // create row to add to HTML table
        const htmlToAppend = createMovieRowHtml(movieRow);
        // add movie to array 
        movieList.push(movieRow);
        currentId++;

        $("#movie-table-body").append(htmlToAppend);
        $('#input-form').trigger("reset");
    });

    $('tbody').on('click', '.remove-btn', function(evt){
        // console.log(typeof(parseInt(evt.target.id.slice(-1))));
        $(evt.target).closest('tr').remove();
        // remove movie from array
        movieList.splice(parseInt(evt.target.id.slice(-1)),1);
        currentId = movieList.length;
        // renumber array
        for (let num of movieList){
            num.currentId = movieList.indexOf(num);
        }
        // renumber delete buttons
        for (let i = 0; i<movieList.length; i++){
            $(".remove-btn").eq(i).attr("id",`del-${i}`);
        }
    })
})

function createMovieRowHtml (data) {
    return `
    <tr>
        <td>${data.movie}</td>
        <td>${data.rating}</td>
        <td> <button class = "remove-btn" id ="del-${currentId}">Delete </button> </td>
    </tr>`;
}

