<?php

class NoDocBlocksClass {
    public static function maybe(): self {
        return new Foo();
    }

    public function tomorrow(int $atHour, bool $fingersCrossed = false): void {}

    protected function not(): bool {
        return true;
    }

    private function today(): bool {
        return false;
    }
}
