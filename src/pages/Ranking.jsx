import Footer from '../components/footer';
import Card from '../components/footer';
import Rank from '../components/rank';

function Ranking() {
    const ranks = [
        {name: 'john1234', count: 12},
        {name: 'ken3354', count: 9},
        {name: 'masa3456', count: 7},
        {name: 'mike6434', count: 4},
        {name: 'mary6784', count: 1},
        {name: 'john1234', count: 12},
        {name: 'ken3354', count: 9},
        {name: 'masa3456', count: 7},
        {name: 'mike6434', count: 4},
        {name: 'mary6784', count: 1},
        {name: 'john1234', count: 12},
        {name: 'ken3354', count: 9},
        {name: 'masa3456', count: 7},
        {name: 'mike6434', count: 4},
        {name: 'mary6784', count: 1},
    ]

    return (
      <>
          <div className="page">
              <main className="content ranks-content">
                  <div className="title-wrap">
                      <p className="title">ランキング</p>
                  </div>
                  <div className="ranks-container">
                      {
                        ranks.map((o, index)=>(
                                <Rank number={index + 1} name={o.name} count={o.count}/>
                        )
                        )
                      }
                  </div>
              </main>
              <Footer />
          </div>
      </>
    );
  }
  
  export default Ranking;