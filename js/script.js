function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

start = new Date().getTime();
terrain = window.terrain;
character = window.character;

async function race() {
    while (character.characterPosition < (window.terrain.rockPosition-125)){  // персонаж бежит до тех пор пока его координаты < координаты камня-125 после этого прыгает 
        await sleep(10);
        character.run();
    }
    character.jump();
    await sleep(100);
    distance = character.characterPosition;  // расстояние на котором прыгнул персонаж
    character.run();
    await sleep(5000);
    character.stop();
};

function finish(run_status) {
    isFinished = true;
    $("#begin").removeAttr("disabled");
    let end = new Date().getTime();                      // записываем время когда персонаж финишировал
    let rockPosition = terrain.rockPosition;             // получаем координаты камня
    let time_passed = ((end - start) / 1000).toString();  // записываем время потраченное на прохождение уровня
    let rock_size = terrain.rockSize;                     // получаем размер камня
    makedata(rockPosition, rock_size, distance, run_status, time_passed);
}

function makedata(rockPosition, rock_size, distance, run_status, time_passed) {
    let data = {
        'rock_position': rockPosition,
        'rock_size': rock_size,
        'distance': distance,
        'run_status': run_status,
        'time_passed': time_passed,
    };

    $.ajax({
        method: 'post',
        url: 'response.php',
        data: data,
        success: function (response) {
            let responseJson = $.parseJSON(response);
        },
    });
}

async function startrun() {
    isFinished = false;
    $("#begin").prop("disabled", true);
    while (!isFinished) {
        await race();
        await sleep(100);
    }
}