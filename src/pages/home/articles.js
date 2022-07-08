import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {reqArticles} from "../../api";
import moment from "moment/moment";

function Articles() {
    const [articles, setArticles] = React.useState([]);
    const params = useParams();
    useEffect(() => {
        reqArticles(params.category || null).then(res => {
            setArticles(res.data);
        });
    }, [params.category]);
    return (<main>
            <div className="main-container">
                <ul className="articles">
                    {articles.map(article => {
                        return (<li key={article.title}>
                            <time>{moment(article.date).format("Y-M-D dddd")}</time>
                            <Link to={`/article/${article.title}`}><h2>{article.title}</h2></Link>
                        </li>)
                    })}
                </ul>
            </div>
        </main>)
}


export default Articles;