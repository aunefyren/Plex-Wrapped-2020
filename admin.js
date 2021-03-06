function time_days(seconds_input) {
    var seconds = Number(seconds_input);
    var days = seconds * 1.15741E-5;

    var hours = String(days).split(".");
    var hours_str = "0." + hours[1];
    var hours_int = Number(hours_str) * 24.0;

    var minutes = String(hours_int).split(".");
    var minutes_str = "0." + minutes[1];
    var minutes_int = Number(minutes_str) * 60.0;

    var days_form = String(days).split(".");
    var hours_form = String(hours_int).split(".");
    var minutes_form = String(minutes_int).split(".");

    var final = [Number(days_form[0]), Number(hours_form[0]), Number(minutes_form[0])];
    return final;
}

function time_hours(seconds_input) {
    var seconds = Number(seconds_input);
    var hours_int = Number(seconds) * 0.0002777778;

    var minutes = String(hours_int).split(".");
    var minutes_str = "0." + minutes[1];
    var minutes_int = Number(minutes_str) * 60.0;

    var hours_form = String(hours_int).split(".");
    var minutes_form = String(minutes_int).split(".");

    var final = [Number(hours_form[0]), Number(minutes_form[0])];
    return final;
}

function makeRequest (method, url, data) {
    return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    if(method=="POST" && data){
        xhr.send(data);
    }else{
        xhr.send();
    }
    });
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function login_menu() {
    topFunction();
    var html = '<form id="password_login_form" onsubmit="get_config();return false">'

    html += '<div class="form-group">';
    html += '<label for="password" title="The password chosen during first-time setup.">Password</label>';
    html += '<input type="password" class="form-control" id="password" value="" autocomplete="off" required />';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<input type="submit" class="form-control btn" id="password_button" value="Log in" required />';
    html += '</div>';

    html += '</form>';
    document.getElementById("setup").innerHTML = html;
}

function set_password(back) {
    topFunction();
    var html = '<form id="password_form" onsubmit="set_tautulli(false);return false">'

    html += '<div class="form-group">';
    html += '<label for="password" title="The password needed to change the config-file remotely.">Set an admin password</label>';
    html += '<input type="password" class="form-control" id="password" value="' + password + '" autocomplete="off" required />';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="password_2" title="The password needed to change the config-file remotely.">Repeat the password</label>';
    html += '<input type="password" class="form-control" id="password_2" value="' + password + '" autocomplete="off" required />';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<input type="submit" class="form-control btn" id="password_button" value="Save" required />';
    html += '</div>';

    html += '</form>';
    document.getElementById("setup").innerHTML = html;
}

function set_tautulli(back) {

    topFunction();
    if(!back) {
        if(document.getElementById('password').value == document.getElementById('password_2').value) {
            password = document.getElementById('password').value;
        } else {
           alert("The passwords must match.");
           return false;
       }
    }

    var html = '<div class="form-group">';
    html += '<button class="form-control btn" onclick="set_password(true)">Set admin password</button>';
    html += '</div>';

    html += '<form id="tautulli_form" onsubmit="set_tautulli_details(false);return false">'

    html += '<div class="form-group">';
    html += '<label for="tautulli_apikey" title="The API key needed to interact with Tautulli. Commonly found at Tautulli->Settings->Web Interface->API Key.">Tautulli API key</label>';
    html += '<input type="text" class="form-control" id="tautulli_apikey" value="' + tautulli_apikey + '" autocomplete="off" required /><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="tautulli_ip" title="The IP address or domain that connects to Tautulli. No subfolders as this is another setting, but subdomains can be defined.">IP or domain for Tautulli connection</label>';
    html += '<input type="text" class="form-control" id="tautulli_ip" value="' + tautulli_ip + '" required /><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="tautulli_port" title="The port Tautulli uses for connections. Typically empty if a domain is used.">Port for Tautulli (optional)</label>';
    html += '<input type="text" class="form-control" id="tautulli_port" value="' + tautulli_port + '" /><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="tautulli_length" title="The max amount of items Tautulli responds with. Typically doesn\'t need to be changed, but with server-wide stats it could limit results if the amount of items needed are extreme.">Tautlli item length</label>';
    html += '<input type="number" class="form-control" id="tautulli_length" value="' + tautulli_length + '" autocomplete="off" required /><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="tautulli_root" title="Subfolder for Tautulli, no slashes needed at the beginning or end. It is the folder accessed after the main IP/domain. For example: tautulli.com/subfolder.">Root for Tautulli (optional)</label>';
    html += '<input type="text" class="form-control" id="tautulli_root" value="' + tautulli_root + '" autocomplete="off" /><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="ssl" title="Enable if your connection uses HTTPS.">Use SSL (optional)</label>';
    html += '<input type="checkbox" class="form-control" id="ssl" ';
    if(ssl) {
        html += 'checked="' + ssl + '" ';
    }
    html += '/><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="library_id_movies" title="The ID for your chosen movie library in Tautulli. Can be found by going to Tautulli->Libraries->Your library. The ID is the url as section_id.">ID for movie-library in Tautulli</label>';
    html += '<input type="number" class="form-control" id="library_id_movies" value="' + library_id_movies + '" autocomplete="off" required /><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="library_id_shows" title="The ID for your chosen show library in Tautulli. Can be found by going to Tautulli->Libraries->Your library. The ID is the url as section_id.">ID for show-library in Tautulli</label>';
    html += '<input type="number" class="form-control" id="library_id_shows" value="' + library_id_shows + '" autocomplete="off" required /><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<input style="background-color: lightgrey;" type="button" class="form-control btn" id="test_connection" onclick="test_tautulli_connection()" value="Test Tautulli connection" />';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<input type="submit" class="form-control btn" id="form_button" value="Save" required />';
    html += '</div>';

    html += '</form>';

    document.getElementById("setup").innerHTML = html;
}

function set_tautulli_details(back) {
    topFunction();
    if(!back) {
        tautulli_apikey = document.getElementById('tautulli_apikey').value;
        tautulli_ip = document.getElementById('tautulli_ip').value;
        tautulli_port = document.getElementById('tautulli_port').value;
        tautulli_length = document.getElementById('tautulli_length').value;
        tautulli_root = document.getElementById('tautulli_root').value;
        ssl = document.getElementById('ssl').checked;
        library_id_movies = document.getElementById('library_id_movies').value;
        library_id_shows = document.getElementById('library_id_shows').value;
    }
    var html = '<div class="form-group">';
    html += '<button class="form-control btn" onclick="set_tautulli(true, false)">Tautulli settings</button>';
    html += '</div>';

    html += '<form id="tautulli_details_form" onsubmit="set_tautulli_last(false);return false">'

    var temp_date = wrapped_start.toLocaleDateString("en-GB", { // you can skip the first argument
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          timezone: "Europe/London",
    });
    var temp_date = temp_date.split(',');
    var temp_date_first = temp_date[0].split('/');
    var temp_date_second = temp_date[1].split(':');
    html += '<div class="form-group">';
    html += '<label for="wrapped_start" title="The start of the period you want wrapped.">Start of wrapped period</label>';
    html += '<input type="datetime-local" class="form-control" id="wrapped_start" value="' + temp_date_first[2].trim() + '-' + temp_date_first[1].trim() + '-' + temp_date_first[0].trim() + 'T' + temp_date_second[0].trim() + ':' + temp_date_second[1].trim() + '" required /><br>';
    html += '</div>';

    var temp_date = wrapped_end.toLocaleDateString("en-GB", { // you can skip the first argument
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timezone: "Europe/London",
    });
    var temp_date = temp_date.split(',');
    var temp_date_first = temp_date[0].split('/');
    var temp_date_second = temp_date[1].split(':');
    html += '<div class="form-group">';
    html += '<label for="wrapped_end" title="The end of your wrapped period. All data until this point is viable.">End of wrapped period<br>';
    html += '<input type="datetime-local" class="form-control" id="wrapped_end" value="' + temp_date_first[2].trim() + '-' + temp_date_first[1].trim() + '-' + temp_date_first[0].trim() + 'T' + temp_date_second[0].trim() + ':' + temp_date_second[1].trim() + '" required /></label>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="get_user_movie_stats" title="Includes movie statistics in your wrapped period.">Get users movie statistics (optional)<br>';
    html += '<input type="checkbox" class="form-control" id="get_user_movie_stats" ';
    if(get_user_movie_stats) {
        html += 'checked="' + get_user_movie_stats + '" ';
    }
    html += '/><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="get_user_show_stats" title="Includes show statistics in your wrapped period.">Get users show statistics (optional)<br>';
    html += '<input type="checkbox" class="form-control" id="get_user_show_stats" ';
    if(get_user_show_stats) {
        html += 'checked="' + get_user_show_stats + '" ';
    }
    html += '/><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="get_user_show_buddy" title="Includes the users top show-buddy in your wrapped period. Requires show stats.">Get users show-buddy (optional)<br>';
    html += '<input type="checkbox" class="form-control" id="get_user_show_buddy" ';
    if(get_user_show_buddy) {
        html += 'checked="' + get_user_show_buddy + '" ';
    }
    html += '/><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="get_year_stats" title="Includes server-wide statistics in your wrapped period.">Get server-wide statistics (optional)<br>';
    html += '<input type="checkbox" class="form-control" id="get_year_stats" ';
    if(get_year_stats) {
        html += 'checked="' + get_year_stats + '" ';
    }
    html += '/><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="use_cache" title="Caches your results in cache.json for later use.">Cache results for later use (optional)<br>';
    html += '<input type="checkbox" class="form-control" id="use_cache" ';
    if(use_cache) {
        html += 'checked="' + use_cache + '" ';
    }
    html += '/><br>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="cache_age_limit" title="How old the cache can be in days before it expires.">Amount of days cache is valid (optional)<br>';
    html += '<input type="number" class="form-control" id="cache_age_limit" value="' + cache_age_limit + '" /></label>';
    html += '</div>';

    html += '<div class="form-group" title="Clear the cache to include the newest settings.">';
    html += '<label for="clear_cache">Clear cache (optional)<br>';
    html += '<input type="checkbox" class="form-control" id="clear_cache" checked /></label>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<input type="submit" class="form-control btn" id="form_button" value="Finish" required />';
    html += '</div>';

    html += '</form>';
    document.getElementById("setup").innerHTML = html;
}

function test_tautulli_connection() {
    var button = document.getElementById('test_connection');
    button.style.backgroundColor = 'lightgrey';

    ssl_temp = document.getElementById('ssl').checked;
    ip_temp = document.getElementById('tautulli_ip').value;
    root_temp = document.getElementById('tautulli_root').value;
    port_temp = document.getElementById('tautulli_port').value;
    api_temp = document.getElementById('tautulli_apikey').value;

    if(ssl_temp) {
        var prefix = 'https://';
    } else {
        var prefix = 'http://';
    }

    if(root_temp == "") {
        var suffix = '';
    } else {
        var suffix = '/' + root_temp + '/';
    }

    if(port_temp == "") {
        url = prefix + ip_temp + suffix + '/api/v2';
    } else {
        url = prefix + ip_temp + ':' + port_temp + suffix + '/api/v2';
    }

    config_form = {"url" : url, "ssl" : ssl_temp, "apikey" : api_temp};

    var config_data = JSON.stringify(config_form);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if(!result.error) {
                button.style.backgroundColor = '#79A04F';
            } else {
                button.style.backgroundColor = '#F1909C';
            }
        }
    };
    xhttp.withCredentials = true;
    xhttp.open("post", 'api/get_connection.php');
    xhttp.send(config_data);
}

function set_tautulli_last(back) {
    if(!back) {
        wrapped_start = new Date(document.getElementById('wrapped_start').value);
        wrapped_end = new Date(document.getElementById('wrapped_end').value);
        if(wrapped_end < wrapped_start) {
            alert("The wrapped end period must be later than the wrapped start period.");
            return;
        }

        get_user_movie_stats = document.getElementById('get_user_movie_stats').checked;
        get_user_show_stats = document.getElementById('get_user_show_stats').checked;
        get_user_show_buddy = document.getElementById('get_user_show_buddy').checked;
        get_year_stats = document.getElementById('get_year_stats').checked;
        use_cache = document.getElementById('use_cache').checked;
        cache_age_limit = document.getElementById('cache_age_limit').value;

        set_config();
    }
}