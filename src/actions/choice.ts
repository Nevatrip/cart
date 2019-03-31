
export const getPlaces = function (id: string, directionId: string, date: string, event: string) {
    return fetch(`http://api.nevatrip.ru/service/${id}/schedule/${directionId}/${date}/${event}`,  {
        method: "GET",
        headers: {},
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
        })
}


export const getType = function (id: string, directionId: string, date: string) {
    return fetch(`http://api.nevatrip.ru/service/${id}/schedule/${directionId}/${date}`,  {
        method: "GET",
        headers: {},
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
        })
}

