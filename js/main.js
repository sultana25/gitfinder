$(document).ready(function(){
    $('#userName').on('keyup',function(e){
        let username=e.target.value;
        //Make request to github
        
        $.ajax({
           url:'https://api.github.com/users/'+username,
           data:{
            client_id:'7d71b3c55ec0b1613e7b',
            client_secret:'6795a56702727e66178206c9d46746e1957ad4a1'

        }
        }).done(function(user){
            $.ajax({
               url:'https://api.github.com/users/'+username+'/repos',
               data:{
                client_id:'7d71b3c55ec0b1613e7b',
                client_secret:'6795a56702727e66178206c9d46746e1957ad4a1',
                sort:'created : asc',
                per_page:5
               }
            }).done(function(repos){
               $.each(repos,function(index,repo){
                 $('#repos').append(`       
                    <div class="well">
                        <div class="row">
                            <div class="col-md-7">
                                <strong>${repo.name }</strong>:${repo.description}
                            </div>
                            <div class="col-md-3">
                                <span class="label label-default">Forks: ${repo.forks_count}</span>
                                <span class="label label-primary">Watchers: ${repo.watchers_count} </span>
                                <span class="label label-success">Stars: ${repo.stargazers_count}</span> 
                            </div>
                            <div class="col-md-2">
                                <a target="_blank" href="${repo.html_url}" class="btn btn-info">Repo Page</a>
                            </div>
                        </div>
                    </div>
                `);  
               }); 
            });
           $('#profile').html(`
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">${user.name}</h3>
              </div>
              <div class="panel-body">
                <div class='row'>
                    <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}">
                        <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="label label-default">Public Repos: ${user.public_repos}</span>
                        <span class="label label-primary">Public Gists: ${user.public_gists} </span>
                        <span class="label label-success"  style="{margin-right:10px}">Followers: ${user.followers}</span>
                        <span class="label label-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">User Since: ${user.created_at}</li>
                        </ul>
                    </div>

                </div>
              </div>
            </div>
            <h3 id="page-header">Latest Repos</h3>
            <div id="repos"></div>
        `);
        });
    });
});