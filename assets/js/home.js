const IP = 'http://4.228.111.250:3000';

//funcao para pegar dados do usuario
async function getUserData(id) {
    const token = localStorage.getItem('token');
    if (!token) {
      document.querySelector('.profile-desc .name').innerHTML = "Nenhum";
      return
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${IP}/user`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.status === 200) {  
        const username = data.user.fullName;
        const role = data.user.role;
        const img = data.user.photoImage;
        document.querySelector('.profile-desc .name').innerHTML = username;
        document.querySelector('.profile-desc .role').innerHTML = role;
        document.querySelector('.profile img').src = `${IP}/${img}`;
      }

      if (response.status === 403) {  
        localStorage.removeItem('token');
      }

    } catch (error) {
      console.error('Erro ao obter nome de usuário:', error);
    }
}

//funcao para carregar tarefas no calendario
async function loadUpcomingTasks() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${IP}/tasks/upcoming`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 200) {
    const data = await response.json();
    const upcomingTasks = data.tasks.map((task) => ({
      title: task.description,
      start: task.deadline,
      color: 'red'
    }));

    var calendarEl = document.querySelector('.calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridWeek',
        locale: 'pt-BR',
        buttonText: {
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia"
        },
        timeZone: 'UTC-3',
        themeSystem: 'bootstrap5',
        events: upcomingTasks,
          eventClick: function (event) {
            //colocar o modal aqui quando o usuário clicar na tarefa.
          }
        });
    calendar.render();

  } else {
    const data = await response.json();
    alert(`Erro ao carregar as tarefas próximas de expirar: ${data.message}`);
  }
}

async function loadTaskstoFinish() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${IP}/tasks/pending`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (response.status === 200) {
    const data = await response.json();
    data.tasks.forEach(element => {
      let newItem = document.createElement("li")
      newItem.innerHTML = element.description
      $(".tasksToFinish").append(newItem)
    });
  } else {
    const data = await response.json();
    alert(`Erro ao carregar as tarefas proximas de terminar: ${data.message}`);
  }
}

async function loadTasksCompleted() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${IP}/tasks/completed`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (response.status === 200) {
    const data = await response.json();
    data.tasks.forEach(element => {
      let newItem = document.createElement("li")
      newItem.innerHTML = element.description
      $(".tasksCompleted").append(newItem)
    });
  } else {
    const data = await response.json();
    alert(`Erro ao carregar as tarefas proximas de terminar: ${data.message}`);
  }
}

async function loadLeaderboard() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${IP}/leaderboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 200) {
    const data = await response.json();
    
    $("#crown p").html(data.leaderboard[0].fullName)
    $("#crown > span").html(data.leaderboard[0].points + ' pts')
    $("#crown .position img").attr("src", `${IP}/${data.leaderboard[0].photoImage}`)

    $("#second-place p").html(data.leaderboard[1].fullName)
    $("#second-place > span").html(data.leaderboard[1].points + ' pts')
    $("#second-place .position img").attr("src", `${IP}/${data.leaderboard[1].photoImage}`)

    $("#third-place p").html(data.leaderboard[2].fullName)
    $("#third-place > span").html(data.leaderboard[2].points + ' pts')
    $("#third-place .position img").attr("src", `${IP}/${data.leaderboard[2].photoImage}`)

  } else {
    const data = await response.json();
    alert(`Erro ao carregar a classificação: ${data.message}`);
  }
}

async function recentlyCompleted() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${IP}/tasks/recent/completed`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 200) {
    const data = await response.json();
        
    data.tasks.forEach(async task => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${IP}/user/${task.user}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const dataUser = await response.json();
      $(".activities ul").append(`
      <li>
        <div class="name-desc">
            <img src="${IP}/${dataUser.user.photoImage}" alt="Foto de Perfil">
            <div class="desc">
                <span>${dataUser.user.fullName}</span>
                <span>${task.description}</span>
            </div>
        </div>
      </li>
    `);

    })
    $("#activities ul")
  } else {
    const data = await response.json();
    alert(`Erro ao carregar tarefas completadas: ${data.message}`);
  }
}


//funcao para login
async function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}
$(".logout").on( "click", logout);

loadUpcomingTasks()
loadTaskstoFinish()
loadTasksCompleted()
loadLeaderboard()
recentlyCompleted()
getUserData()