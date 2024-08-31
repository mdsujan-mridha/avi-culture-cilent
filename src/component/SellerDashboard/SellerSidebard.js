

import React from 'react';
import "./SellerSidebard.css";
import { Link } from 'react-router-dom';
import { Add, ChevronRight, Dashboard, ExpandMore, PostAdd} from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/x-tree-view';


const SellerSidebard = () => {
    return (
        <div className='sidebar'>
            <Link to="/" className='flex justify-center items-center gap-2'>
                {/* <img src={logo} alt="Log" /> <p className='text-4xl font-bold text-primary'> Book Share </p> */}
            </Link>
            <Link to="/seller/dashboard">
                <p> <Dashboard /> Dashboard</p>
            </Link>
            <Link>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronRight />}

                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/seller/product/new">
                            <TreeItem nodeId="2" label="Add" icon={<Add />} />
                        </Link>
                        <Link to="/seller/product">
                            <TreeItem nodeId="3" label="All" icon={<PostAdd />} />
                        </Link>
                    </TreeItem>

                    {/* <TreeItem nodeId="5" label="Accessories">
                        <TreeItem nodeId="10" label="Add" icon={<Add />} />
                        <TreeItem nodeId="6" label="All" icon={<PostAdd />} />
                    </TreeItem> */}

                </TreeView>
            </Link>


        </div>
    );
};

export default SellerSidebard;