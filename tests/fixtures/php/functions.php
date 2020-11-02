<?php

/**
 * A function for fooing
 *
 * @return string
 */
function foo(): string
{
    return 'foo';
}

/**
 * A function for baring
 *
 * @param int $baz
 *
 */
function bar(int $baz = 1) {
    return str_repeat('bar', $baz);
}
