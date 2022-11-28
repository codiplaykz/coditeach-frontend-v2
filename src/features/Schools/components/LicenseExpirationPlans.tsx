import {RadioGroup} from "@headlessui/react";
import {Fragment} from "react";

interface LicenseExpirationPlansProps {
    selected: number,
    setSelected: Function
}

export default function LicenseExpirationPlans({selected, setSelected}: LicenseExpirationPlansProps) {
    const licenseMonthPlans = [1, 3, 6, 12, 24]

    return (
        <div className="license-plans">
            {/*@ts-ignore*/}
            <RadioGroup value={selected} onChange={setSelected}>
                {
                    licenseMonthPlans.map((licenseMonthPlan, index) => {
                        return (
                            <RadioGroup.Option key={licenseMonthPlan} as={Fragment} value={licenseMonthPlan}>
                                {({ checked }) => (
                                    <div className={`license-plan ${checked && 'checked'}`}>
                                        {
                                            licenseMonthPlan < 3 ? `${licenseMonthPlan} месяц` :
                                                (licenseMonthPlan >=3 && licenseMonthPlan < 6) || licenseMonthPlan === 24 ?
                                                    `${licenseMonthPlan} месяца` : `${licenseMonthPlan} месяцев`
                                        }
                                    </div>
                                )}
                            </RadioGroup.Option>
                        )
                    })
                }
            </RadioGroup>
        </div>
    )
}