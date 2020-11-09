<?php
/**
 * @copyright 2020
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Documentation;


use PhpParser\Node;
use PhpParser\Node\Stmt;
use PhpParser\NodeTraverser;
use PhpParser\NodeVisitorAbstract;
use Symfony\Component\Finder\SplFileInfo;

class FileResult implements \JsonSerializable
{
    /**
     * @var array
     */
    private $functions;

    /**
     * @var string
     */
    private $namespace;

    /**
     * @var array<int,string> fqcns of contained classes
     */
    private $classes;

    /**
     * @var SplFileInfo
     */
    private $fileInfo;

    /**
     * FileResult constructor.
     * @param SplFileInfo     $fileInfo
     * @param array<int,Stmt> $parserResult
     */
    public function __construct(SplFileInfo $fileInfo, array $parserResult)
    {
        // TODO: all of this should probably happen somewhere else

        $this->fileInfo = $fileInfo;

        $nodeVisitor = new class extends NodeVisitorAbstract {
            private $classes = [];
            private $namespace = '';
            private $functions = [];

            public function enterNode(Node $node)
            {
                if ($node instanceof Node\Stmt\Class_) {
                    $class = new \stdClass();

                    $class->name = $node->name;

                    $classVisitor = new class extends NodeVisitorAbstract {
                        private $methods = [];

                        public function enterNode(Node $node)
                        {
                            if ($node instanceof Stmt\ClassMethod) {
                                $this->methods[] = $node->name;
                            }
                        }

                        public function getMethods(): array
                        {
                            return $this->methods;
                        }
                    };

                    $traverser = new NodeTraverser();
                    $traverser->addVisitor($classVisitor);
                    $traverser->traverse([$node]);

                    $class->methods = $classVisitor->getMethods();

                    $this->classes[] = $class;
                }

                if ($node instanceof Node\Stmt\Namespace_) {
                    $this->namespace = $node->name;
                }

                if ($node instanceof Stmt\Function_) {
                    $this->functions[] = $node->name;
                }
            }

            public function getClasses(): array {
                return $this->classes;
            }

            public function getNamespace(): string
            {
                return $this->namespace;
            }

            public function getFunctions(): array {
                return $this->functions;
            }
        };

        $traverser = new NodeTraverser();
        $traverser->addVisitor($nodeVisitor);
        $traverser->traverse($parserResult);

        $this->classes = $nodeVisitor->getClasses();
        $this->namespace = $nodeVisitor->getNamespace();
        $this->functions = $nodeVisitor->getFunctions();
    }

    public function jsonSerialize()
    {
        $nodeFormatter = new NodeFormatter();

        return [
            'filename' => $this->fileInfo->getPath(),
            'namespace' => $this->namespace,
            'functions' => $nodeFormatter->formatNodes($this->functions),
            'classes' => $nodeFormatter->formatNodes($this->classes),
        ];
    }
}
