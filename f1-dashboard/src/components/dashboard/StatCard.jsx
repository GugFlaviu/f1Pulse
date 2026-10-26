import './css/StatCard.css'
export default function StatCard({title,number,paragraph,icon}){
    return(<>
        <div className="stat-card">
            {icon}
            <div className="text-side-right">
                <h1 className='stat-title'>{title}</h1>
                <p className='stat-number'>{number}</p>
                <p className='stat-paragraph'stat-paragraph>{paragraph}</p>
                
            </div>
        </div>
    </>)
}
