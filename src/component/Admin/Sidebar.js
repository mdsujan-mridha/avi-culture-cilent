import { Add, ChevronRight, Dashboard, ExpandMore, PostAdd, VerifiedUser } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import { TreeItem, TreeView } from "@mui/x-tree-view";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/" className='flex justify-center items-center gap-2'>
                {/* <img src={logo} alt="Log" /> <p className='text-4xl font-bold text-primary'> Book Share </p> */}
            </Link>
            <Link to="/admin/dashboard">
                <p> <Dashboard /> Dashboard</p>
            </Link>
            <Link>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronRight />}

                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/product">
                            <TreeItem nodeId="2" label="Add" icon={<Add />} />
                        </Link>
                        <Link to="/admin/products">
                            <TreeItem nodeId="3" label="All" icon={<PostAdd />} />
                        </Link>
                    </TreeItem>
                    <TreeItem nodeId="5" label="Accessories">
                        <TreeItem nodeId="10" label="Add" icon={<Add />} />
                        <TreeItem nodeId="6" label="All" icon={<PostAdd />} />
                    </TreeItem>

                    <TreeItem nodeId="25" label="User">
                        <Link to="/admin/users">
                            <TreeItem nodeId="23" label="Users" icon={<VerifiedUser />} />
                        </Link>
                    </TreeItem>
                    <TreeItem nodeId="35" label="Orders">
                        <Link to="/admin/orders">
                            <TreeItem nodeId="36" label="All" icon={<PostAdd />} />
                        </Link>
                    </TreeItem>
                    <TreeItem nodeId="15" label="Blog">
                        <Link to="/admin/blog/new">
                            <TreeItem nodeId="13" label="Add Blog" icon={<Add />} />
                        </Link>
                        <Link to="/admin/blogs">
                            <TreeItem nodeId="16" label="All Blog" icon={<PostAdd />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>


        </div>
    );
};

export default Sidebar;