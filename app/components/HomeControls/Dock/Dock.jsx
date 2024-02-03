
import { Dock } from 'primereact/dock';

import './Dock.styles.css';
import Image from 'next/image';

export default function BasicDemo() {

    const items = [
        {
            label: 'Finder',

            icon: () => <Image  alt="Finder" src="https://primefaces.org/cdn/primereact/images/dock/finder.svg" width="100%" />,
        },
        {
            label: 'App Store',
            icon: () => <Image  alt="App Store" src="https://primefaces.org/cdn/primereact/images/dock/appstore.svg" width="100%" />,
        },
        {
            label: 'Photos',
            icon: () => <Image  alt="Photos" src="https://primefaces.org/cdn/primereact/images/dock/photos.svg" width="100%" />,
            command: () => {
              alert("hghghghg")
            }
        },
        {
            label: 'Trash',
            icon: () => <Image  alt="trash" src="https://primefaces.org/cdn/primereact/images/dock/trash.png" width="100%" />,
        }
    ];



    return (
 <Dock model={items} position={"left"} />
      
    )
}
        