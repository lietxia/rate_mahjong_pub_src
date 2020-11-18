<?php

$order = $_REQUEST["order"];
$return = array();
switch ($order) {
    case 'new_log':
        // 新记录
        break;
    case 'index_list1':
        // 新记录
        break;
    default:
        $return = array("非法访问");
}
die(json_encode($return));
