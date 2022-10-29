import React from "react";
import DashboardLayout from "hoc/dashboardLayout";
import SiteVars from './siteVars';

const DateDespreSite = () => {
    return (
        <DashboardLayout title="Date de contact ale site-ului">
            <SiteVars />
        </DashboardLayout>
    )
}

export default DateDespreSite;