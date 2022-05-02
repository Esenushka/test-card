import { useEffect, useState } from "react"

export default function Card({ author, channel, date, content, attachments, id }) {
    const [active, setActive] = useState(false)
    const [longStr, setLongStr] = useState(content.length > 250 ? true : false)
    const [hideShow, setHideShow] = useState(false)
    const add = () => {
        setActive(!active)
    }

    useEffect(() => {
        const stars = JSON.parse(localStorage.getItem("star")) || {}
        setActive(stars[id])
    }, [id]);

    useEffect(() => {
        const stars = JSON.parse(localStorage.getItem("star")) || {}
        localStorage.setItem("star", JSON.stringify({ ...stars, [id]: active }))
    }, [active, id]);

    return (
        <div className="main_wrapper">
            <header>
                <div className='left'>
                    <img src='/images/photo.png' alt='Logo' />
                    <div>
                        <div>
                            {author}
                        </div>
                        <div>
                            {channel}
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='buttons'>
                        <button className='btn'>Левый</button>
                        <button className='btn'>Центр</button>
                        <button className='btn'>Правый</button>
                    </div>
                    <div className='icons'>
                        <img src='/images/send.png' alt='send_icon' />
                        <img title={hideShow ? "Показать" : "Скрыть"} onClick={() => { setHideShow(!hideShow) }} src='/images/hide.png' alt='hide_icon' />
                        <img src='/images/setting.png' alt='setting_icon' />
                        <img title="Избранное" onClick={add} className={`${active ? "active" : ""}`} src='/images/star.png' alt='star_icon' />
                    </div>
                </div>
            </header>
            <main >
                <div>{date}</div>
                <div>
                    <div className={hideShow ? "active" : ""}>
                        {longStr ? content.slice(0, 250) + " . . ." : content}
                    </div>
                    {
                        longStr ? <div className={hideShow ? "active" : ""} onClick={() => { setLongStr(false) }}>Далее</div> : ""
                    }

                    {
                        attachments.map((el) =>
                            el.type === "video" ?
                                <video key={el.type} className="attachment" controls width={500} height={250} >
                                    <source type="video/mp4" src={el.url}>
                                    </source>
                                </video>
                                :
                                <img key={el.type} className="attachment" src={el.url} alt={el.type} />
                        )
                    }
                </div>
            </main>
            <div className="tag">
                <div className='active'>#Новое</div>
                <div>#Эксперт</div>
            </div>
        </div>
    )
}
