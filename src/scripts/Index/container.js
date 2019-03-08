import { connect } from 'react-redux';
import Index from './Components'

export default connect(() => ({ a: 'kkk' }), { function(){ return { a: () => {} } } })(Index)
