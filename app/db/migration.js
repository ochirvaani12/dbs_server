const createTaskViewQuery = `
    create or replace view vw_task as
    select 
        t.id,
        c.id as company_id,
        c.name as company_name,
        t.proj_id,
        p.name as proj_name,
        p.description as proj_desc,
        t.client_staff_id,
        cs.name as client_staff_name,
        t.staff_id,
        s.firstname as staff_firstname,
        s.lastname as staff_lastname,
        s.position as staff_position,
        t.status,
        t.subject,
        t.type,
        t.priority,
        t.position,
        t.due_date,
        t.created_at,
        t.finished_at
    from task t
    left join project p on p.id = t.proj_id
    left join staff s on s.id = t.staff_id
    left join client_staff cs on cs.id = t.client_staff_id
    left join client_company c on c.id = cs.company_id
`;

module.exports = { createTaskViewQuery };