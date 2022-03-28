
class FoodifyServices {
    _apiBase = 'https://www.themealdb.com/api/json/v1/1/';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        return await this.getResource(`${this._apiBase}random.php`);
    }

}

export default FoodifyServices;