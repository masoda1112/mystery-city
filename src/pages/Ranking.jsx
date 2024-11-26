import Footer from '../components/footer';
import Card from '../components/footer';
import Rank from '../components/rank';
import Header from '../components/header'

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
              <Header title='Ranking'/>
              <main className="content ranks-content">
                  <div className="ranks-container">
                      {
                        ranks.map((o, index)=>(
                            <div className='rank-wrap' key={index}>
                                <Rank number={index + 1} name={o.name} count={o.count}/>
                            </div>
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