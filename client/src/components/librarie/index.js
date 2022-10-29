import React, { useEffect, useReducer, useState } from "react";
import CardBlocks from "utils/produse/card.blocks";
import PagNav from "utils/paginateNav";
import Cautare from "./cautare";
import AscundereOptiuni from "./ascundereOptiuni";
import Preturi from "./preturi";

import { useDispatch, useSelector } from "react-redux";
import { produseByPaginate } from "store/actions/produs.actions";
import { getCategoriiAll } from "store/actions/categorii.actions";

const defaultValues = { cuvinte_cheie: '', categorie: [], min: 0, max: 100000, domeniul_educational: [], page: 1 }

const Librarie = () => {
    const [grid] = useState(false);
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    );
    const { byPaginate } = useSelector(state => state.produse);
    const categorii = useSelector(state => state.categorii);
    const dispatch = useDispatch();
    const goToPage = (page) => {
        setSearchValues({ page: page })
    }
    const handleResetSearch = () => {
        setSearchValues({ cuvinte_cheie: '', page: 1 })
    }
    const handleKeywords = (values) => {
        setSearchValues({ cuvinte_cheie: values, page: 1 })
    }
    const handleFilters = (filters,optiune) => {
        if(optiune === 'categorii'){
            setSearchValues({ categorie: filters, page: 1 })
        }
        if(optiune === 'domeniul_educational'){
            setSearchValues({ domeniul_educational: filters, page: 1 })
        }
    }
    const handleRange = (values) => {
        setSearchValues({ min:values[0]-1, max:values[1]+1, page: 1 })
    }
    useEffect(() => {
        dispatch(getCategoriiAll())
    },[dispatch]);

    useEffect(() => {
        dispatch(produseByPaginate(searchValues))
    },[searchValues, dispatch]);

    return (
        <div className="page_container">
            <div className="page_top">
                <div className="container">
                    <Cautare
                        handleKeywords={(values)=> handleKeywords(values)}
                    />
                </div>
            </div>
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <AscundereOptiuni
                            initialState={true}
                            title="Categorii"
                            list={categorii.all}
                            handleFilters={(filters) => handleFilters(filters,'categorii')}
                        />
                        <AscundereOptiuni
                            initialState={false}
                            title="Produse recomandate"
                            list={[
                                {_id:"Pentru domeniul educațional", denumire:"Pentru domeniul educațional"},
                                {_id:"Pentru uz personal", denumire:"Pentru uz personal"},
                            ]}
                            handleFilters={(filters) => handleFilters(filters,'domeniul_educational')}
                        />
                        <Preturi
                            title="Preț"
                            handleRange={(values)=>handleRange(values)}
                        />
                    </div>
                    <div className="right">
                        <div className="shop_options">
                            <div>
                                {byPaginate && byPaginate.docs ?
                                    <>
                                        <CardBlocks
                                            grid={grid}
                                            items={byPaginate.docs}
                                            shop={true}
                                        />
                                        <PagNav
                                            prods={byPaginate}
                                            prev={(page)=>goToPage(page)}
                                            next={(page)=>goToPage(page)}
                                            resetSearch={()=>handleResetSearch()}
                                        />
                                    </>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Librarie;