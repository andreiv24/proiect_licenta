import React from "react";
import DashboardLayout from "hoc/dashboardLayout";
import IstoricUser from "utils/istoricUser";

const UserDashboard = ({users}) => {
    return(
        <DashboardLayout title="Informații utilizator">
            <div className="user_nfo_panel">
                <div>
                    <span>Prenume: {users.data.prenume}</span>
                    <span>Nume: {users.data.nume}</span>
                    <span>Adresă de e-mail: {users.data.email}</span>
                </div>
                {
                    users.data.istoric.length > 0 ?
                    <div className="user_nfo_panel">
                        <h1>Istoricul achizițiilor</h1>
                        <div className="user_product_block_wrapper">
                            <IstoricUser
                                istoric={users.data.istoric}
                            />
                        </div>
                    </div>
                    :null
                }
            </div>
        </DashboardLayout>
    )
}

export default UserDashboard;