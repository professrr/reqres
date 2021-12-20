exports.delay = (delay_time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay_time);
    });
}

exports.JSONparse = (body) => {
    return new Promise((res, rej) => {
        try {
            const json = JSON.parse(body);
            res({ok: true, data:json})
        } catch (err) {
            res({ok: false, data:body})
        }
    })
}