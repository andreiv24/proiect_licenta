const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const produsStructura = mongoose.Schema({
    denumire_produs:{
        required:[true,'Trebuie specificata denumirea produsului'],
        type:String,
        unique:1,
        maxlength:150
    },
    categorie:{
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required:true
    },
    domeniul_educational:{
        required:true,
        type: String
    },
    descriere:{
        required:[true,'Produsul trebuie sa aibe descriere'],
        type:String,
        maxlength:10000
    },
    pret:{
        required:true,
        type: Number,
        maxlength: 255
    },
    in_stoc:{
        required:[true,'Cate produse sunt pe stoc in acest moment'],
        type:Number,
        maxlength:3000,
        default:0
    },
    livrare:{
        required:[true,'De specificat daca produsul are taxa de livrare sau nu'],
        type: Boolean,
        default: false
    },
    imagini:{
        type: Array,
        default:[]
    },
    data:{
        type: Date,
        default: Date.now
    }
});

produsStructura.plugin(aggregatePaginate);

const Produs = mongoose.model('Produs',produsStructura);
module.exports = {
    Produs
}