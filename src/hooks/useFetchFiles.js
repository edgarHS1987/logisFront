import { useEffect, useState} from 'react';
import {fetchBlob,driverListDocuments} from '../services/drivers';
//import {obtenerDocsConBlobAsync, getBlob} from '../helpers/uploadDocument';

export const useFetchFiles = ( tipo,idDriver ) =>{
    
    const [docs,setDocs] = useState( [] ); 
    const [loading,setLoading] = useState( '' );

    async function getBlob( doc ) {
        let blobFi = await fetchBlob( doc,tipo,idDriver  );
        return blobFi;
    };
    
    async function obtenerDocsConBlobAsync(data) {
        const docsConBlob = await Promise.all(data.map(async (doc) => {
          const blobFile = await getBlob(doc.name);
          return {
            name: doc.name,
            blobFile: blobFile,
          };
        }));
        return docsConBlob;
    }

    const getDocs = async() => {
        let error = '';
        let msg = '';
        
        const resp = await driverListDocuments(tipo,idDriver);
        const data = await resp[0];

        obtenerDocsConBlobAsync(data)
        .then((docsConBlob) => {
            // Haz algo con los documentos que ahora tienen blobs

            setDocs( docsConBlob );
            setLoading( false );
        })
        .catch((error) => {
            console.error('Error al obtener blobs:', error);
            setLoading(true);
        });
    }
    

    useEffect( () => {
        if (tipo) {
            getDocs();    
        }
        
        return () => {
            setDocs([]);
            setLoading( true );
        };
    },[tipo])

    return{
        docs: docs,
        isLoading: loading,
    }


}