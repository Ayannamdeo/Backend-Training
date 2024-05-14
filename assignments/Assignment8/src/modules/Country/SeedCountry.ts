import countryData from '../../lib/utils/COUNTRY_DATA.json'
import {CountryModel} from './repositories/model'

class SeedCountry{

    static async initialSeed (): Promise<void>{
        await CountryModel.deleteMany({});
        await CountryModel.insertMany(countryData);
    }
    
}

export {SeedCountry};