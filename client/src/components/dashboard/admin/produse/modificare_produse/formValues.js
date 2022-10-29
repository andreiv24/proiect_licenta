import * as Yup from 'yup';

export const formValues = {
    denumire_produs: '',
    categorie: '',
    domeniul_educational: '',
    descriere: '',
    pret: '',
    in_stoc: '',
    livrare: false,
    imagini: []
}

export const getValuesToEdit = (produs) => {
    return {
        denumire_produs: produs.denumire_produs,
        categorie: produs.categorie._id,
        domeniul_educational: produs.domeniul_educational,
        descriere: produs.descriere,
        pret: produs.pret,
        in_stoc: produs.in_stoc,
        livrare: produs.livrare,
        imagini: produs.imagini
    }
}

export const validation = () => (
    Yup.object({
        denumire_produs: Yup.string().required('Denumirea produsului e necesară'),
        categorie: Yup.string().required('Categoria produsului e necesară'),
        domeniul_educational: Yup.string().required('Produsul trebuie să fie recomandat după un anumit criteriu').oneOf(["Pentru domeniul educațional","Pentru uz personal"],"Doar pentru domeniul educațional sau uz personal"),
        descriere: Yup.string().required('Produsul trebuie să aibă o descriere'),
        pret: Yup.number().required('Produsul trebuie să aibă un preț').min(1,'Prețul produsului trebuie să fie de minim 1 leu').max(100000,'Prețul produsului trebuie să fie de maxim 100000 de lei'),
        in_stoc: Yup.number().required('Trebuie specificat numărul de produse din stoc'),
        livrare: Yup.boolean().required('Trebuie specificat dacă produsul va avea livrare')
    })
)