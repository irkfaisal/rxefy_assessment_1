import React from 'react'

const WorkDiv = ({ data }) => {
    // console.log(data?.data)
    const item = data?.data
    // date format function
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year}`;
    }
    const originalDate = '2023-10-02T14:43:48.239Z';
    const formattedDate = formatDate(originalDate);
    console.log('Formatted date:', formattedDate);

    return (
        <>
            {
                item && item.map((i) => {
                    return (
                        <div style={{ width: "300px", height: "300px", background: "#fff", margin: "1rem 0", padding: "1rem" }}>
                            <p>WorkId : {i?.workId}</p>
                            <p>Title: {i?.title} </p>
                            <p>Work: {i?.work}</p>
                            <p>Assigned to: {i?.assignedTo}</p>
                            <p>Assigned By : {i?.assignedBy}</p>
                            <p>Created On:{i?.createdOn}</p>
                            <p>Deadline On: {i?.deadline}</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default WorkDiv
