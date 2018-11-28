function load_table(par,elem,par_element){
    var now = new Date();
    var local_date = new Date();
    local_date.setMonth(now.getMonth()+par);
    var month_mass = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    var month_now_str = month_mass[local_date.getMonth()] + ' ' + local_date.getFullYear();
                    
    var new_month = document.getElementById(elem).cloneNode(true);
                    
    new_month.className = 'calendar';

    var caption = new_month.getElementsByTagName('caption')[0];
    var tbody   = new_month.getElementsByTagName('tbody')[0];

    caption.textContent = month_now_str;
    if (par==0){
        caption.className = 'current';
    }

    local_date.setDate(1);
    var day_of_week = local_date.getDay();

    var month_now = local_date.getMonth();

    while(local_date.getMonth() == month_now){
        var local_week = document.createElement('tr');
        for(var i=0; i<=6; i++){
            var local_day = document.createElement('td');
            local_day.onclick = set_this_current;
            if (i==day_of_week){
                local_day.textContent = local_date.getDate();
                if ((local_date.getDate() == now.getDate()) & (par==0)){
                    local_day.className = 'current';
                } 
                local_date.setDate(local_date.getDate()+1);
                day_of_week = local_date.getDay();
                if(local_date.getMonth() != month_now){
                    break;
                }
            } 
            local_week.appendChild(local_day);
        }

        tbody.appendChild(local_week);
    }
    document.getElementById(par_element).appendChild(new_month);
}


function create_calendar_window(){
    //заполним таблицы
    for(var month_counter = -1; month_counter <= 2; month_counter++){
        load_table(month_counter,'month_table','calendar_panel');
    }
}

function set_this_current(){
    var mass_of_old_current_el = document.getElementsByClassName('current');
    for(var i=mass_of_old_current_el.length-1; i>=0; i--){
        mass_of_old_current_el[i].className = '';
    }
    this.className = 'current';
    this.parentElement.parentElement.parentElement.children[0].className = 'current';
    
}