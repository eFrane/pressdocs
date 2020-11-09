<?php
/**
 * @copyright 2020
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Documentation;


use PhpParser\Node;
use PhpParser\NodeVisitorAbstract;
use PhpParser\ParserFactory;
use Symfony\Component\Finder\Finder;

class Parser
{
    /**
     * @var array<int,string>
     */
    protected $parseDirs;

    /**
     * @var array<int,FileResult>
     */
    protected $results;

    /**
     * @var bool
     */
    private $includeVcsIgnored;

    /**
     * Parser constructor.
     * @param array<int,string> $parseDirs
     * @param bool              $includeVcsIgnored
     */
    public function __construct(array $parseDirs, bool $includeVcsIgnored = false)
    {
        $this->parseDirs = $parseDirs;
        $this->includeVcsIgnored = $includeVcsIgnored;
        $this->results = [];
    }

    public function parse()
    {
        $finder = $this->configureFinder();

        foreach ($finder as $splFileInfo) {
            $parser = (new ParserFactory())->create(ParserFactory::PREFER_PHP7);
            $parserResults = $parser->parse(file_get_contents($splFileInfo->getRealPath()));

            $fileResult = new FileResult($splFileInfo, $parserResults);

            $this->results[] = $fileResult;
        }
    }

    private function configureFinder(): Finder
    {
        return Finder::create()
            ->in($this->parseDirs)
            ->name('*.php')
            ->files();
    }

    public function getResults(): array
    {
        return $this->results;
    }
}
