export default function get(url, callback) {
    fetch(url)
        .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    callback(response.status, "");
                }
            },
        )
        .then(result => {
        })
        .caches(error => {
        });
}
