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

    const checkPrevNext = (subjectname) => {
        const selectedSubject = subjects.find(subject => subject.name === subjectname) 
        const prevs = subjects.filter(subject => selectedSubject.prev.includes(subject.name));
        const nexts = subjects.filter(subject => selectedSubject.next.includes(subject.name));

        const auxSubjects = subjects.map(subject => ({
            ...subject,
            isPrev: false,
            isNext: false,
        }));

        prevs.forEach(prevSubject => {
            const subjectIndex = auxSubjects.findIndex(subject => subject.name === prevSubject.name);
            auxSubjects[subjectIndex].isPrev = true;
        });

        nexts.forEach(nextSubject => {
            const subjectIndex = auxSubjects.findIndex(subject => subject.name === nextSubject.name);
            auxSubjects[subjectIndex].isNext = true;
        });

        setSubjects(auxSubjects);

        //console.log(prevs);
        //console.log(nexts);
    };

    const resetPrevNext = () => {
        const resetSubjects = subjects.map(subject => ({
            ...subject,
            isPrev: false,
            isNext: false,
        }));
        setSubjects(resetSubjects);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('button')) {
                resetPrevNext();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [subjects]);

    return (
        <div className='mallacurricular'>
            {qtySemesters.map(numero => (
                <ul key={numero}>
                    <li className='titlesemester'>Semestre {numero}</li>
                    {subjects
                        .filter(subject => subject.semester === numero)
                        .map(subject => (
                            <li key={subject.name}>
                                <button 
                                onClick={() => checkPrevNext(subject.name)}
                                className={`${subject.isPrev ? 'prev' : ''} ${subject.isNext ? 'next' : ''}`}
                                >
                                {subject.name}
                                </button>
                            </li>
                        ))}
                </ul>
            ))}
        </div>
    );
}