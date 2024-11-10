import { useState, useEffect } from 'react';
import './malla.css';

export default function Malla(){
    const [subjects, setSubjects] = useState([]);
    const [qtySemesters, setQtySemesters] = useState([]);

    useEffect(() => {
        fetch('/subjects.json')
        .then((response) => response.json())
        .then((data) => {setSubjects(data.subjects)
            let semesters = data.subjects.map( subject => subject.semester);
            setQtySemesters([...new Set(semesters)]);
        });
    }, []);


    const MarcarAnterior = (subjectsname) => {
        // Restablecer todos los subjects a desmarcados
        const updatedSubjects = subjects.map(subject => ({
            ...subject,
            marcado: false, // Desmarcar todos los subjects
        }));
    
        // Filtrar todos los subjects que tengan 'next' igual a subjectsname
        let prevs = subjects.filter(subject => subject.next[0] === subjectsname);
    
        // Recorrer todos los subjects previos y marcar según el índice
        prevs.forEach(prevSubject => {
            const subjectIndex = updatedSubjects.findIndex(subject => subject.name === prevSubject.name);
            if (subjectIndex !== -1) {
                // Marcar el subject con la propiedad 'marcado'
                updatedSubjects[subjectIndex].marcado = true;
            }
        });
    
        // Actualizar el estado de subjects para reflejar el cambio
        setSubjects(updatedSubjects);
    };


    return (
        <div className='mallacurricular'>
            {qtySemesters.map(numero => (
                <ul key={numero}>
                    <li className='titlesemester'>Semestre {numero}</li>
                    {subjects
                        .filter(subject => subject.semester === numero)
                        .map(subject => (
                            <li index={subject.name}>
                                <button 
                                onClick={() => MarcarAnterior(subject.name)}
                                className={subject.marcado ? 'marcado' : ''}>
                                {subject.name}
                                </button>
                            </li>
                        ))}
                </ul>
            ))}
        </div>
    );
}