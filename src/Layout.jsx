import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar'

const Layout = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Sidebar></Sidebar>
        <div className='ml-64 p-6'>
        {children}
          
        </div>
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout